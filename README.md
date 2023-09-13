### Install the necessary dependencies by running the command npm install in the project directory.

Create a .env file in the project directory and set the necessary environment variables. This file should contain the following variables:

### PORT: the port number on which the server will listen (default is 3000)
other necessary variables for your specific application
Start the server by running the command npm start in the project directory.

Once the server is running, you can access the API endpoints using a tool like Postman or by making HTTP requests from your application.

### Authentication:
Route: POST /api/v1/auth/signup
Access: user
Function: registers a new user by creating a new entry in the users table in the database. The function hashes the provided password and generates a token for the user. Returns the newly created user data and token.

Route: POST /api/v1/auth/login
Access: user
Function: logs in a user by checking if the provided email exists in the users table. It then compares the provided password with the hashed password in the database. If the passwords match, a token is generated and returned along with the user data.

Function: authProtect
Usage: middleware function to protect specific routes that require authentication. It checks if a token is present in the request headers, verifies the token, and retrieves the corresponding user data from the database. If the token is valid, the function proceeds with the next middleware or route handler.

Function: allowedTo
Usage: middleware function to restrict access to specific routes based on user roles. It checks if the user's role matches any of the roles passed as arguments. If the user's role is not allowed, it returns an error response.

### Booking:
Route: POST /api/v1/book/create-booking
Access: user
Function: creates a new booking for a room in a hotel. Inserts the booking data into the bookings table in the database and returns the newly created booking data.

Route: POST /api/v1/cancel-booking/:id
Access: user
Function: cancels a booking for a specific booking ID. It checks if the booking exists for the authenticated user and deletes the booking entry from the bookings table in the database.

### Hotel:
Route: POST /api/v1/hotel/create-hotel
Access: admin
Function: creates a new hotel by inserting the provided data into the hotels table in the database. Returns the newly created hotel data.

Route: GET /api/v1/hotel/get-hotels
Access: all
Function: retrieves all hotels from the hotels table in the database. Supports pagination and searching for hotels using a searchTerm query parameter. Returns the paginated hotel data based on the provided page and limit parameters.

Route: GET /api/v1/hotel/get-oneHotel/:id
Access: user
Function: retrieves information for a specific hotel based on the provided hotel ID. Returns the matching hotel data.

### Room:
Route: POST /api/v1/room/create-room
Access: admin
Function: creates a new room in a specific hotel by inserting the provided data into the rooms table in the database. Returns the newly created room data.

Route: GET /api/v1/room/get-rooms
Access: all
Function: retrieves all rooms from the rooms table in the database. Supports pagination and searching for rooms using a searchTerm query parameter. Returns the paginated room data based on the provided page and limit parameters.

Route: GET /api/v1/room/get-oneroom/:id
Access: user
Function: retrieves information for a specific room based on the provided room ID. Returns the matching room data.

### PayPal Payment:
Route: POST /api/v1/payment
Access: user
Function: initiates a payment process using the PayPal API. Creates a payment object and redirects the user to the PayPal payment page.

Route: GET /api/v1/payment/:paymentId/:payerId
Access: user
Function: executes a payment process using the PayPal API. Executes the payment with the provided payment ID and payer ID.

Note: The code provides a brief description for each route and its purpose. It also specifies the required access level for each route (user, admin, all). The functions implement the logic for each route, including database operations, data retrieval, and data manipulation.