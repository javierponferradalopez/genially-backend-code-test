# Genially backend test

This test aims to carry out the following [requirements](REQUIREMENTS.md) proposed by the technical team of [Genially](https://genial.ly/).

This README has two sections:
* [Step by step](#step-by-step)
* [Installation](#installation)
## Step by step
This section will briefly describe the changes I made to complete each step (requirement) and even those proposals to improve that I could not address in this project due to lack of time.
I will also describe some of the additional changes that although they are not subject to any step, are part of the project.

### Step 0
Although at the level of requirements there is no step 0, I think it is necessary to point out that the project initially could not be executed since many of its dependencies were very outdated. So it was necessary to catch up before starting development.

Thinking about the development of e2e tests. It is a good idea to create a class that acts as a wrapper of the application so that this helps us to be able to instantiate from the test environment.

To manage the project configuration, we use [`convict`](https://github.com/mozilla/node-convict/tree/master/packages/convict). This library allows us to access/validate/type the different environment variables used in the project.

### Step 1
To meet the requirements of this step, it was necessary to support 3 flows responsible for managing the Genially entity/model.
In my case, I created a controller per action to simplify maintenance regarding managing the necessary dependencies per action.
* `GeniallysCreateController`
* `GeniallysDeleteController`
* `GeniallysRenameController`

All of them implement the IController interface. For now, it simply requires that each controller implement the `run` function.

Regarding the HTTP responses we return in the controllers, we take as a philosophy to use:
* `422`: error to indicate that the received body is not valid for the action, indicating the invalid properties.
* `500`: unexpected error. It is normally returned when an entity/model has not been created correctly.
* `404`: error that we return when the indicated resource does not exist.
* `204`: returned when a resource has been deleted or updated.
* `201`: returned when the resource has been created correctly.

Additional changes:
* I have used property objects for each property of the Genially entity, to ensure that any data
  handled is correct. This provides us with greater scalability, flexibility and encapsulation.
* I have improved the way routes are declared to make them more scalable.
* I have improved the persistence layer (InMemoryGeniallyRepository) to be able to use it, as it
  previously returned an error.

Using dependency injection helps us to be able to do tests more easily by being able to configure
the different implementations we want to use for those tests.
The instances registered in the container would be the following:

* `GeniallyRepository` --> `InMemoryGeniallyRepository`
* `CreateGeniallyService` --> `CreateGeniallyService(GeniallyRepository)`
* `DeleteGeniallyService` --> `DeleteGeniallyService(GeniallyRepository)`
* `RenameGeniallyService` --> `RenameGeniallyService(GeniallyRepository)`
* `GeniallysCreateController` --> `GeniallysCreateController(CreateGeniallyService)`
* `GeniallysDeleteController` --> `GeniallysDeleteController(DeleteGeniallyService)`
* `GeniallysRenameController` --> `GeniallysRenameController(RenameGeniallyService)`

Useful packages installed in this step:
* [`http-status`](https://github.com/adaltas/node-http-status) utility library that acts as an HTTP status map
* [`uuid`](https://github.com/uuidjs/uuid) UUID generator
* [`uuid-validate`](https://github.com/microsoft/uuid-validate) UUID validator
* [`express-validator`](https://github.com/express-validator/express-validator): validate the request bodies processed at each endpoint, the library is used
* [`node-dependency-injection`](https://github.com/zazoomauro/node-dependency-injection): library responsible for instantiating and managing a dependency container.

### Step 2
This step proposes creating another implementation of `GeniallyRepository`. In this case, we want to use Mongo as a NoSQL database.

I create a folder called `Shared` that will help us contain all the logic used by all contexts.
`MongoRespository` acts as an `Adapter Pattern` to the `Mongo` client. This helps us to be able to extend this class by adding its specific functionality. In this case, `MongoGeniallyRepository`.

`MongoRepository` requires a `Mongo` client instance by constructor, so we need to build and configure this instance.
I decide to create the following files:
* `MongoConfig`: abstraction interface to help specify the necessary data to instantiate a `Mongo` client.
* `MongoConfigFactory`: factory of objects with the required format in the previous interface.
* `MongoClientFactory`: factory of client instances for `Mongo` using the previous interface as a requirement. And it is responsible for converting this configuration to the requirements of the [`mongodb`](https://github.com/mongodb/node-mongodb-native) library.

There are other libraries such as [`mongoose`](https://github.com/Automattic/mongoose) that have advantages such as using the UnitOfWork pattern, but as this is a test project, I think it is not necessary.

With the help of [`convict`](https://github.com/mozilla/node-convict), we access the environment variable `MONGO_URL` which is the address of the database server.

### Step 3
This step proposes creating a new entity `GeniallysCounter` that will help us count each creation of `Genially`.
I anticipate a need that is essential to avoid coupling. And this new requirement forces us to communicate two domains located in different modules. In this case, `genially` with `geniallys-counter`. So it's time to talk about domain events.


A `AgregateRoot` class is created, which each model extends by adding the following logic:
* add an abstract function that returns a literal object with primitive data of said model.
* add a stack (array) of events triggered by the same model instance.
* function to extract all of them cleaning the stack of events.
* function to stack a new event.

Several abstractions that are part of this domain event flow are created:
* An abstract class `DomainEvent` is created, which is extended by each concrete event, providing fundamental states and functionalities.
* A `EventBus` interface is created to be able to implement it with any event handling technology such as `EventEmitter` or `RabbitMQ`. In this case, I use `EventEmitter` (native to Node).
* A `DomainEventSubscriber` interface is created that implements each concrete event and can be added to the `EventEmitter` listener.

The steps to follow when creating a `Genially`, receiving it and creating/updating the `GeniallyCounter` counter are as follows:
1. The `Genially` resource is created, which in turn creates the `GeniallyCreatedDomainEvent` event and adds the information about it to the `Genially` instance stack.
2. From the application service, all events are extracted and published on the bus (`InMemoryAsyncEventBus`).
3. Previously, the different subscribers that listen to events are registered and execute their associated callback (`IncrementGeniallysCounterOnGeniallyCreated`). This subscriber's callback is to increment the `GeniallyCounter` counter and save the changes in the database.

### Step 4 ¿?
This step is even more important than all the previous ones!
We are talking about testing. Although testing is not mentioned in the requirements, I believe it is obvious that it should be added along with any code we implement in our project.

In my case, I have created two test environments:
* `E2E`: the real application is started in test mode and tests are performed on the different
  public endpoints. This way we make sure that each flow works from start to finish.
* `UNIT`: it is in charge of testing each functionality of the application in isolation.
  So they are really fast. They are grouped by directories similar to /src.

I have created several scripts that allow running these environments:
* `test`: launch only unit tests.
* `test:watch`: launch only unit tests detecting changes in real time.
* `test:e2e`: run only e2e tests.
* `test:watch:e2e`: run only e2e tests detecting changes in real time.
* `test:all`: run both unit tests and e2e.

## Installation
Installing dependencies
```sh
npm install
```

### Environment variables
[`convict`](https://github.com/mozilla/node-convict) is used for environment variable handling.
In this route `src/contexts/shared/infrastructure/config/` there are 3 files:
* `index.ts`: creates the rules/validations of all the configurations accessible from the application as the format of each environment variable. And loads depending on the environment (env) the json file that overrides those variables.
* `development.json`: indicates the values to override the environment variables in development.
* `test.json`: indicates the values to override the environment variables in test.

### Database
A mongo instance that listens on `localhost:27017` is simply required.
My advice would be to use `docker` as it is a test environment. The databases used are:
| Environment | Name |
| ------ | ------ |
| development | backend-dev |
| test | backend-test |

### Run application
```sh
# development
npm run dev
```
### Tests
```sh
# Unit
npm run test
# Unit watch
npm run test:watch

# E2E
npm run test:e2e
# E2E watch
npm run test:watch:e2e
```

**From: Javier Ponferrda López**
