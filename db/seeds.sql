INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Manager', 55000, 1),
       (2, 'Salesperson', 45000, 1),
       (3, 'Sr Engineer', 65000, 2),
       (4, 'Jr Engineer', 55000, 2),
       (5, 'Account Manager', 65000, 3),
       (6, 'Accountant', 50000, 3),
       (7, 'Legal Affairs Executive', 75000, 4),
       (8, 'Legal Aide', 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jason', 'LaRose', 1, NULL ),
       ('Emma', 'McCartney', 2, 1),
       ('Brynn', 'Grumstrup', 3, NULL),
       ('Robert', 'Clemmer', 4, 3),
       ('Jessica', 'Torhan', 5, NULL),
       ('Matt', 'Hammons', 6, 5),
       ('Ed', 'Hess', 7, NULL),
       ('Kelvina', 'Doss', 8, 7);

