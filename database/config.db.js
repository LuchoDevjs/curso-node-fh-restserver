import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_ATLAS,
      { useNewUrlParser: true },
      (err, res) => {
        if (err) throw err;

        console.log("Base de Datos ONLINE");
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

export { dbConnection };
