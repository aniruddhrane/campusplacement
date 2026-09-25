import mongoose from "mongoose"
const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:''
    },
    type:{
        type:String,
        enum:['project','class','club','event','study','general'],
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    admins:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }],
    members:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    }],
    pendingRequests:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    }],
    settings:{
        onlyAdminsCanPost:{
            type:Boolean,
            default:false
        },
        requireApproval:{
            type:Boolean,
            default:false
        }
    },
    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

groupSchema.index({members:1})
groupSchema.index({createdBy:1})
export default mongoose.model('Group',groupSchema)