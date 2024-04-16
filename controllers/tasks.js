const Task=require('../models/task');
const asyncwrapper=require('../middleware/asyncwrapper');
const {CreateCustomError}=require('../errors/CustomErrorApi');
const getAllTasks=asyncwrapper (async (req,res)=>{
        const tasks=await Task.find({});
        res.status(200).json({tasks});
})
const addTask=asyncwrapper( async (req,res)=>{
        const task=await Task.create(req.body);
        res.status(201).json({task});
})
const getTask=asyncwrapper(async (req,res,next)=>{
    
        const {id:TaskID}=req.params;
        const task=await Task.findOne({_id:TaskID});
        if(!task)
        {
           return next(CreateCustomError('Not Found Task',404));
        }
        res.status(201).json({task});
})
const deleteTask=asyncwrapper(async (req,res,next)=>{
    
        const {id:TaskID}=req.params;
        const task=await Task.findOneAndDelete({_id:TaskID});
        if(!task)
        {
            return next(CreateCustomError('Not Found Task',404));
        }
        res.status(201).json({task});
    })
const updateTask=asyncwrapper(async (req,res,next)=>{
    const {id:TaskID}=req.params
    const task=await Task.findOneAndUpdate({_id:TaskID},req.body,{
        new:true,
        runValidators:true
    })
    if(!task)
    {
        return next(CreateCustomError(`Not Task`,404));
    }
    res.status(201).json({task});
})


module.exports={getAllTasks,addTask,getTask,updateTask,deleteTask};