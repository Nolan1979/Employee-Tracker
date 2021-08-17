INSERT INTO department (name)
VALUES  ("Accounting"),
        ("Market Research"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Senior Accountant", 110000, 1),
        ("Accountant", 60000.00, 1),
        ("Senior Marker Research Manager", 150000, 2),
        ("Data Analyst", 65000.00, 2),
        ("Sales Rep", 65000.00, 3),
        ("Cashier", 24000.00, 3);    

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, "Bob", "Uecker", NULL),
        (2, "Lynn", "Belvedere", 1),
        (3, "Terry", "Jones", NULL),
        (4, "Terry", "Gilliam", 3), 
        (5, "Julius", "Erving", NULL),   
        (6, "Pete", "Maravich", 5);