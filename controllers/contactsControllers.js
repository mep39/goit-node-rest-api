// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updContact,
//   //   contactsService
// } from "../services/contactsServices.js";
import contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
// import { validateBody } from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsServices.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsServices.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const { error } = createContactSchema.validate({
    name,
    email,
    phone,
  });
  //   const { error } = validateBody.createContact(req.body);

  if (error) throw new HttpError(400, error);
  const result = await contactsServices.addContact(req.body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;

  const { error } = updateContactSchema.validate({
    name,
    email,
    phone,
  });
  const result = await contactsServices.updContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

// module.exports = {
//   listContact: validateBody(listContact),
//   getContactById: validateBody(getContactById),
//   addContact: validateBody(addContact),
//   updateContact: validateBody(updateContact),
//   removeContact: validateBody(removeContact),
// };
