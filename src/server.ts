import { Server } from "http";
import app from "./app";
import { connectMongo } from "./connection/mongodb";
import { environment } from "./config/environment";

let server: Server;

async function runner() {
   try {
      // Ensure MongoDB connection
      await connectMongo();
      console.log("🎉✨ Successfully connected to MongoDB");

      // Start the server
      server = app.listen(environment.port, () => {
         console.log({
            what: `🎉✨ Server Running on PORT: ${environment.port}`,
            where: `http://localhost:${environment.port}`,
         });
      });

      // Handle server-specific errors
      server.on("error", (error) => {
         console.log({
            what: `🤦‍♂️ SERVER failed to start`,
            why: error,
         });
         process.exit(1);
      });
   } catch (error) {
      console.log({
         what: `🤦‍♂️ SERVER or DATABASE failed to start with some error!`,
         why: error,
      });
      process.exit(1); // Exit the process if the server or database fails
   }
}

// Call the runner
runner();

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
   console.log("💥 Unhandled Rejection detected! Shutting down...");
   console.error(reason);
   if (server) {
      server.close(() => process.exit(1));
   } else {
      process.exit(1);
   }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
   console.log("💥 Uncaught Exception detected! Shutting down...");
   console.error(error);
   process.exit(1);
});
