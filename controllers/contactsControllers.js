import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);

  if (!result) {
    return res.status(404).json({ message: HttpError(404).message });
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    res.status(404).json({ message: HttpError(404).message });
  }
  res.json(result);
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newResult = await contactsService.addContact(name, email, phone);
    if (!newResult) {
      next(HttpError(404));
    }
    res.status(201).send(newResult);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const updatedResult = await contactsService.updateContact(
      req.params.id,
      name,
      email,
      phone
    );
    if (!updatedResult) {
      next(HttpError(404));
    }
    res.status(200).send(updatedResult);
  } catch (error) {
    next(error);
  }
};
// export const createContact = async (req, res) => {
//   const result = await contactsService.addContact(req.body);
//   res.status(201).json(result);
// };

// export const updateContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsService.updateContact(id, req.body);
//   if (!result) {
//     res.status(404).json({ message: HttpError(404).message });
//   }
//   res.json(result);
// };

// // import {
// //   listContacts,
// //   getContactById,
// //   removeContact,
// //   addContact,
// //   updateContact,
// // } from "../services/contactsServices.js";
// import contactsServices from "../services/contactsServices.js";

// // import { validateBody } from "../helpers/validateBody.js";
// // import {
// //   createContactSchema,
// //   updateContactSchema,
// // } from "../schemas/contactsSchemas.js";
// import HttpError from "../helpers/HttpError.js";

// export const getAllContacts = async (req, res, next) => {
//   try {
//     const contacts = await contactsServices.listContacts();
//     res.status(200).json(contacts);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getOneContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const contact = await contactsServices.getContactById(id);
//     if (!contact) {
//       throw new HttpError(404, "Not found");
//     }
//     res.status(200).json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const contact = await contactsServices.removeContact(id);
//     if (!contact) {
//       throw new (HttpError(404, "Not found"))();
//     }
//     res.status(200).json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createContact = async (req, res, next) => {
//   try {
//     const { name, email, phone } = req.body;
//     // const { error } = createContactSchema.validate({
//     //   name,
//     //   email,
//     //   phone,
//     // });
//     // if (error) {
//     //   throw new HttpError(400, error.message);
//     // }
//     // const contact = await contactsServices.addContact(name, email, phone);
//     // res.status(201).json(contact);
//     const newContact = await contactsServices.addContact(name, email, phone);
//     res.status(201).json(newContact);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     // const { body } = req;
//     // const { error } = updateContactSchema.validate(body);

//     // if (error) {
//     //   throw new HttpError(400, error.message);
//     // }

//     if (!Object.keys(req.body).length) {
//       throw new (HttpError(400, "Body must have at least one field"))();
//     }

//     const updatedContact = await contactsServices.updateContact(id, req.body);

//     if (!updatedContact) {
//       throw new (HttpError(404, "Not found"))();
//     }

//     res.status(200).json(updatedContact);
//   } catch (error) {
//     next(error);
//   }
// };

// export default {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
// };
