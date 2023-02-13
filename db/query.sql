-- SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name AS department
-- FROM role
-- JOIN department ON role.department_id = department.id;

SELECT role.id AS Id, role.title AS Role, role.salary AS Salary, department.name AS department
From Role
JOIN department ON role.department_id = department.id

-- , department.name AS Dept FROM department JOIN department ON role.department_id = department.id;