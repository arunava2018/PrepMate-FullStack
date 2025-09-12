import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// -------- Get all subjects (with question count) --------
export const getSubjects = async (req,res) =>{

}
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