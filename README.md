# Campus Recruitment Training — Phase 2 (10 days)

This repository contains the projects, exercises, and API tests completed during the 10-day Phase 2 campus recruitment training (~60 hours). The training covered Java backend development, Spring Framework, microservices, Docker, API testing with Postman, frontend demos, and unit testing.

## Training story

We started with a historical look at Java and JDBC, including how early enterprise applications were built with raw JDBC/Servlets. That set the stage for the Spring Framework, which solves problems like manual configuration, dependency hell, and brittle wiring.

The first part of the course covered:

- Java history and JDBC limitations
- Spring Framework architecture and core annotations (`@Controller`, `@Service`, `@Repository`, `@RestController`)
- Bean lifecycle, dependency injection, auto-wiring, and application context
- Maven package management and dependency repositories
- The enterprise development philosophy: highly cohesive modules and loosely coupled services

We then moved into Spring Boot and clean enterprise workflows, including:

- Structured layered design: controllers, models/DTOs, services, repositories, exception handling, and validation
- Standard Spring Boot project structure and `pom.xml`
- REST APIs using Spring Data JPA and CRUD operations
- Better error handling and API responses with custom exceptions

Around Day 7 the original trainer had to leave due to a personal emergency, and a new trainer took over for the rest of the course. We had a built-in buffer for the handover, which helped us finish the remaining advanced topics smoothly.

## What I learned

- How raw JDBC and manual Java configuration lead to fragile applications
- Why Spring exists: for dependency injection, inversion of control, and simplified configuration
- How Maven central and `pom.xml` manage dependencies and project lifecycle
- The Spring Boot way of building enterprise apps with consistent structure
- How to build modular, testable code with controllers, services, repositories, and validation
- How microservices work, and why service discovery (Netflix Eureka) is useful for dynamic environments
- How to test APIs with Postman collections
- Containerization with Docker for consistent deployment
- Writing unit tests with JUnit 5 and Mockito for production-ready code

## Trainer note

- The first trainer delivered the initial core architecture and Spring topics.
- On Day 7 the trainer left for personal reasons and a new trainer continued the course.
- This transition was managed carefully so the remaining microservices, Docker, and testing topics were covered without losing momentum.

## Important files and folders

Use these direct folder links to open the most important training projects quickly.

- [D1/CRUD_EMP](D1/CRUD_EMP) — CRUD Java/Maven example
- [D2/P1/SpringiocDemo](D2/P1/SpringiocDemo) — Spring IOC demo
- [D2/P2/BeanAnnotation](D2/P2/BeanAnnotation) — Spring annotation demo
- [D2/P3 Spring Boot](D2/P3%20Spring%20Boot) — Spring Boot starter app
- [D3/P1 demorestapi/demorestapi](D3/P1%20demorestapi/demorestapi) — REST API sample
- [D3/P2 demojpa/demoFrontend](D3/P2%20demojpa/demoFrontend) — demo frontend service
- [D3/P2 demojpa/demojpa](D3/P2%20demojpa/demojpa) — JPA example
- [D4/P2 Frontend/movieFronted/movie-frontend](D4/P2%20Frontend/movieFronted/movie-frontend) — React movie frontend
- [D5/Cricket Frontend/cricket-frontend](D5/Cricket%20Frontend/cricket-frontend) — Cricket React frontend
- [D5/P1_P2 Validation/demoValidation](D5/P1_P2%20Validation/demoValidation) — validation and REST examples
- [D5/P3/Copy of bej_c3_s5_microservices_sessiondemo-master/bej_c3_s5_microservices_sessiondemo-master](D5/P3/Copy%20of%20bej_c3_s5_microservices_sessiondemo-master/bej_c3_s5_microservices_sessiondemo-master) — microservices session demo
- [D6/Final project/JZMKF-INSURANCE](D6/Final%20project/JZMKF-INSURANCE) — final microservices backend
- [D6/Final project/jzmkf-ui](D6/Final%20project/jzmkf-ui) — final insurance frontend
- [D6/P1 Eureka server test/market-data-service](D6/P1%20Eureka%20server%20test/market-data-service) — Eureka microservice example
- [D6/P1 Eureka server test/portfolio-service](D6/P1%20Eureka%20server%20test/portfolio-service) — portfolio service example
- [D8/my_react_app](D8/my_react_app) — additional React practice app
- [D9/demojunit](D9/demojunit) — JUnit demo project
- [D10/Post-Test](D10/Post-Test) — post-test exercises and PDFs
- [D10/Task-1/StudentRestApi](D10/Task-1/StudentRestApi) — student REST API project
- [D10/Task-2/jobapplicationsystem](D10/Task-2/jobapplicationsystem) — job application system
- [D10/Task-3](D10/Task-3) — JWT auth Spring Boot project

## Postman collections

Postman collections and environment exports are stored in the `Postman testing/` folder.

- [User Movie Service](Postman%20testing/User%20Movie%20Service.postman_collection.json)
- [User Authentication Service](Postman%20testing/User%20Authentication%20Service.postman_collection.json)
- [Student Api](Postman%20testing/Student%20Api.postman_collection.json)
- [Cricket Platform API](Postman%20testing/Cricket%20Platform%20API.postman_collection.json)

Environment files (for importing into Postman Environments) are in `Postman testing/Environments/`:

- [Local Microservices Environment](Postman%20testing/Environments/Local%20Microservices.postman_environment.json)
- [Local Development Environment](Postman%20testing/Environments/Local%20Development.postman_environment.json)

Import these JSON files into Postman to replay the CRUD tests and microservice scenarios used during the training.

## Project file highlights

- [`D10/Post-Test/CRT-Training-Post-Test.pdf`](D10/Post-Test/CRT-Training-Post-Test.pdf)
- [`D10/Post-Test/Post Test Questions.pdf`](D10/Post-Test/Post%20Test%20Questions.pdf)
- [`D10/Task-1/StudentRestApi/pom.xml`](D10/Task-1/StudentRestApi/pom.xml)
- [`D10/Task-1/StudentRestApi/src/main/java/rcoem10/studentrestapi/controller/StudentController.java`](D10/Task-1/StudentRestApi/src/main/java/rcoem10/studentrestapi/controller/StudentController.java)
- [`D10/Task-3/pom.xml`](D10/Task-3/pom.xml)
- [`D5/P3/Copy of bej_c3_s5_microservices_sessiondemo-master/bej_c3_s5_microservices_sessiondemo-master/docker-compose.yml`](D5/P3/Copy%20of%20bej_c3_s5_microservices_sessiondemo-master/bej_c3_s5_microservices_sessiondemo-master/docker-compose.yml)
- [`D6/Final project/jzmkf-ui/package.json`](D6/Final%20project/jzmkf-ui/package.json)
- [`D9/P1/Cal.java`](D9/P1/Cal.java)
- [`D9/P1/LaunchCal.java`](D9/P1/LaunchCal.java)

## How to run

Use the project folder and the local Maven wrapper where available.

Example for a Spring Boot project:

```bash
cd D10/Task-1/StudentRestApi
./mvnw clean package
./mvnw spring-boot:run
```

On Windows use `mvnw.cmd`.

## Summary file

For a folder-level overview of the repository content, see [SUMMARY.md](SUMMARY.md).

---

**Completed during Phase 2 Campus Recruitment Training**
