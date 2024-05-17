// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } from "../services/contactsServices.js";
import contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
// import { validateBody } from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsServices.getContactById(contactId);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsServices.removeContact(contactId);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = createContactSchema.validate({
      name,
      email,
      phone,
    });
    if (error) {
      throw new HttpError(400, error.message);
    }
    const contact = await contactsServices.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const { error } = updateContactSchema.validate(body);

    if (error) {
      throw new HttpError(400, error.message);
    }
    const hasFields = Object.keys(body).length > 0;
    if (!hasFields) {
      throw new HttpError(400, "Body must have at least one field");
    }

    const contact = await contactsServices.updateContact(contactId, body);

    if (!contact) {
      throw new HttpError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
