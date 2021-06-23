var router = require("express").Router();

var classes = [
	{
		id: 1,
		name: "X",
		students: [{ name: "Ujang" }, { name: "Dadang" }, { name: "Maman" }],
	},
	{
		id: 2,
		name: "XI",
		students: [{ name: "Dian" }, { name: "Andre" }, { name: "Lukas" }],
	},
	{
		id: 3,
		name: "XII",
		students: [{ name: "Ardhi" }, { name: "Aji" }, { name: "Lanang" }],
	},
];

router.get("/classes/:classId/students/:studentId", async (req, res, next) => {
	let classId = req.params.classId;
	let studentId = req.params.studentId;
	if (classId > 2) {
		next({ status: 400, message: "Class ID Out of Range" });
	}

	let classRoom = classes[classId];
	let student = classRoom.students[studentId];
	res.send({ name: student.name, class: classRoom.name });
});

router.get("/classes", (req, res) => {
	res.send(classes);
});

router.get("/classes/:classId/students", (req, res) => {
	let classId = req.params.classId;

	let classRoom = classes[classId];
	let students = classRoom.students;

	res.send(students);
});

// Add Class
router.post("/classes", (req, res, next) => {
	let newClassRoom = req.body;
	classes.push(newClassRoom);

	res.send(newClassRoom);
});

// Add Student
router.post("/classes/:classId/students", (req, res, next) => {
	let classId = req.params.classId;
	let student = req.body;
	let classRoom = classes[classId];

	classRoom.students.push(student);

	res.send(student);
});

module.exports = router;
