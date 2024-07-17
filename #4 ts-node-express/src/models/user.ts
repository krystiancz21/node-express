import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        // user / admin
        // posts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Article'
        //     }
        // ]
    }
);

export default mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);



// import mongoose, { Document } from "mongoose";
// import { ObjectId } from 'mongodb';

// const Schema = mongoose.Schema;

// // Interfejs użytkownika
// export interface UserInterface extends Document {
//   _id: ObjectId;
//   name: string;
//   email: string;
//   password: string;
// }

// // Schemat użytkownika
// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     // user / admin
//     // posts: [
//     //     {
//     //         type: Schema.Types.ObjectId,
//     //         ref: 'Article'
//     //     }
//     // ]
//   }
// );

// export default mongoose.model<UserInterface>('User', userSchema);
// // module.exports = mongoose.model('User', userSchema);