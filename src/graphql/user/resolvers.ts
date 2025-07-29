import { createUserPayload, UserServices } from '../../services/user'

const Queries={
getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserServices.getUserToken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserServices.getUserById(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },
}

const Mutations={
    createUser: async(_:any,payload:createUserPayload)=>{
        const result = await UserServices.createUser(payload);
        return result.id;
    }
}



export const resolvers ={Queries, Mutations}
