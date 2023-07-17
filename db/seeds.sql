INSERT INTO department(id, name)
VALUES  (001, "HR"),
        (002, "Implementations"), 
        (003, "Customer Services"),
        (004, "Managed Services"),
        (005, "Sales"),
        (006, "Front End Dev"),
        (007, "Back End Dev"),
        (008, "QA"),
        (009, "Tech"),
        (010, "Marketing"); 

INSERT INTO role (id, title, salary, department)
VALUE   (101, "Human Resources", 55000, 001),
        (201, "Senior Human Resources", 65000, 001),
        (302, "Implementations", 50000, 002),
        (402, "Senior Implementations", 50000, 002),
        (503, "Customer Services", 45000, 003),
        (603, "Customer Services Manager", 45000, 003),
        (704, "Data Entry", 45000, 004),
        (804, "Reconciliation Specialist", 50000, 004), 
        (905, "Sales", 50000, 005), 
        (106, "Junior Dev", 70000, 006),
        (206, "Principle Dev", 95000, 006),
        (307, "Principle Dev", 95000, 006),
        (407, "Architect Dev", 145000, 007),
        (508, "QA", 65000, 008),
        (608, "Senior QA", 75000, 008), 
        (709, "Product Manager", 65000, 009), 
        (809, "Project Manager", 65000, 009), 
        (910, "Marketing", 55000, 010); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE   (111, 'Dorothy', 'Jackson', 809, null),
        (112, 'Gerren', 'Jest', 709, null),
        (113, 'Nicole', 'Smith', 910, null),
        (114, 'Terri', 'Ridge', 608, null),
        (114, 'Rich', 'Howard', 508, null),
        (115, 'Don', 'Hopkins', 407, null), 
        (116, 'Chase', 'Chasin', 307, 115), 
        (117, 'Angela', 'Merry', 206, 115), 
        (118, 'Zach', 'Zackin', 106, 115), 
        (119, 'Barry', 'Berrin', 905, null), 
        (120, 'Dennise', 'Aguilar', 804, null), 
        (121, 'Kassidy', 'Kassin', 603, null ),
        (122, 'Linda', 'Lynn', 704, null), 
        (123, 'Lori', 'Couch', 503, 121),
        (124, 'Eva', 'Plant', 402, null ),
        (125, 'Rachel', 'Green', 302, 124),
        (126, 'Colin', 'Yellow', 201, null), 
        (127, 'Anna', 'Blue', 101, 126);



