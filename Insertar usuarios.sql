insert into cuenta_usuario(id , last_login, is_superuser, rol, nombre, correo_electronico, password, is_staff, is_active)
values
(101, null, false, 'Administrador', 'maxi', 'maxi@gmail.com', 'Maxi123#', false, true ),
(102, null, false, 'Departamento de obras', 'boris', 'boris@gmail.com', 'Boris123#', false, true ),
(103, null, false, 'Resolutor', 'benja', 'benja@gmail.com', 'Benja123#', false, true ),
(104, null, false, 'Gestor Territorial', 'eli', 'eli@gmail.com', 'Eli1234#', false, true ),
(105, null, false, 'Director', 'nacho', 'nacho@gmail.com', 'Nacho123#', false, true );
select * from cuenta_usuario;
