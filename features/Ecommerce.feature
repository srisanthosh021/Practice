Feature: Ecommerce Validations

  Scenario: Placing the order
    Given a user credentials "srisanthosh021@gmail.com" and "Sriskeer@0221" for login
    When Add "iphone 13 pro" added to cart
    Then verify added "iphone 13 pro" to cart
    When Enter the details and placing the order
    Then verify the order id present in order history