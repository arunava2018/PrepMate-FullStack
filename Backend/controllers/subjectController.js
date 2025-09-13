import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// -------- Get all subjects (with question count) --------
export const getSubjects = async (req,res) =>{
    try{
        const subjects = await prisma.subjects.findMany({
        include: {
            _count: {
            select: { questions: true },
            },
        },
        });

        // format to include question_count
        const formatted = subjects.map((s) => ({
        ...s,
        question_count: s._count.questions,
        }));

        res.json(formatted);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to fetch subjects" });
    }
}

//-----------Get a specific subject details with subject id---------
export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await prisma.subjects.findUnique({
      where: { id },
      include: {
        questions: true,
        subtopics: true,
      },
    });

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};
// -------- Add new subject --------
export const addSubject = async (req, res) =>{
    try{
        const {name, description, icon} = req.body;
        const subject = await prisma.subjects.create({
            data:{name, description, icon}
        });
        res.status(201).json(
            { 
                subject,
                message:"Subject Added Successfully",
                saved:"true",
            }
        );
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to add subject" });
    }
}