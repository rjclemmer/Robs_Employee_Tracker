INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 55000, 1),
       ('Salesperson', 45000, 1),
       ('Sr Engineer', 65000, 2),
       ('Jr Engineer', 55000, 2),
       ('Account Manager', 65000, 3),
       ('Accountant', 50000, 3),
       ('Legal Affairs Executive', 75000, 4),
       ('Legal Aide', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jason', 'LaRose', 010, NULL ),
       ('Emma', 'McCartney', 011, 010),
       ('Brynn', 'Grumstrup', 020, NULL),
       ('Robert', 'Clemmer', 021, 020),
       ('Jessica', 'Torhan', 030, NULL),
       ('Matt', 'Hammons', 031, 030),
       ('Ed', 'Hess', 040, NULL),
       ('Kelvina', 'Doss', 041, 040);

