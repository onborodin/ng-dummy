
select setval('users_id_seq', (select max(id) from users));
select setval('drivers_id_seq', (select max(id) from drivers));
select setval('vehicles_id_seq', (select max(id) from vehicles));
select setval('relations_id_seq', (select max(id) from relations));
