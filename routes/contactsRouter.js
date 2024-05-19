import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

export default contactsRouter;

// import express from "express";
// import contactsControllers from "../controllers/contactsControllers.js";

// import {
//   createContactSchema,
//   updateContactSchema,
// } from "../schemas/contactsSchemas.js";

// import validateBody from "../helpers/validateBody.js";

// const contactsRouter = express.Router();

// contactsRouter.get("/", contactsControllers.getAllContacts);

// contactsRouter.get("/:contactId", contactsControllers.getOneContact);

// contactsRouter.delete("/:contactId", contactsControllers.deleteContact);

// contactsRouter.post(
//   "/",
//   validateBody(createContactSchema),
//   contactsControllers.createContact
// );

// contactsRouter.put(
//   "/:contactId",
//   validateBody(updateContactSchema),
//   contactsControllers.updateContact
// );

// export default contactsRouter;

// // import express from "express";
// // // import contactsControllers from "../controllers/contactsControllers.js";
// // import {
// //   getAllContacts,
// //   getOneContact,
// //   deleteContact,
// //   createContact,
// //   updateContact,
// // } from "../controllers/contactsControllers.js";
// // import validateBody from "../helpers/validateBody.js";
// // import {
// //   createContactSchema,
// //   updateContactSchema,
// // } from "../schemas/contactsSchemas.js";

// // const contactsRouter = express.Router();

// // contactsRouter.get("/", getAllContacts);

// // contactsRouter.get("/:id", getOneContact);

// // contactsRouter.delete("/:id", deleteContact);

// // contactsRouter.post("/", validateBody(createContactSchema), createContact);

// // contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

// // export default contactsRouter;
