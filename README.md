# Vehicle Theft Repo
Backbone.js application, a repository for managing vehicle theft-related data.
Express server is hosting it locally.
## Technologies Used
- Backbone.js
- Underscore.js
- jQuery
- Bootstrap
- CSS
- Express
## User Stories
### As an Admin
- Add vehicle theft report
- View list of stolen vehicles
- Edit vehicle theft report information
- Update vehicle theft report by toggling recovered or not buttons
## Data
Reports are stored locally in browser's localStorage.
### `collections/vtheftcollection.js`
- serves as a collection of `VTheft` models
- encapsulates data management logic for `VTheft` models
- handles CRUD operations on the models in it
- interacts with local storage (`localStorage`) to persist the collection's data between sessions
- above features makes it part of the Model component of MVC architecture.
## Architecture
### MVC Pattern
Follow the Model-View-Controller(MVC) architectural pattern, which organizes the app in three main components.
- Model: `models/`, represents the application's data and business logic.
- View: `views/`, responsible for rendering the user interface (UI) components and capturing user interactions.
- Controller: `controllers/`, coordinates actions between models and views.
