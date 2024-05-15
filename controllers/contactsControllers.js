// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
//   //   contactsService
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
    const results = await contactsServices.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.getContactById(contactId);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsServices.removeContact(contactId);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
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
    const result = await contactsServices.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }

  //   const { error } = validateBody.createContact(req.body);

  // const result = await contactsServices.addContact(req.body);
  // res.status(201).json(result);
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

    const result = await contactsServices.updateContact(contactId, body);

    if (!result) {
      throw new HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
  // const { name, email, phone } = req.body;
  // const { contactId } = req.params;

  // const { error } = updateContactSchema.validate({
  //   name,
  //   email,
  //   phone,
  // });
  // const result = await contactsServices.updateContact(contactId, req.body);
  // if (!result) {
  //   throw new HttpError(404, "Not found");
  // }
  // res.status(200).json(result);
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};

// export default contactsServices;
