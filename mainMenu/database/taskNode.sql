use manpukudb;
create table TaskNode(
    id int NOT NULL,
    scaleX float not null,
    scaleY float not null,
    posX float not null,
    posY float not null,
    width float not null,
    height float not null,
    taskName text,
    clicking boolean not null
);