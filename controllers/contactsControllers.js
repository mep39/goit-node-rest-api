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
// import {
//   createContactSchema,
//   updateContactSchema,
// } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getContactById(id);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.removeContact(id);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    // const { name, email, phone } = req.body;
    // const { error } = createContactSchema.validate({
    //   name,
    //   email,
    //   phone,
    // });
    // if (error) {
    //   throw new HttpError(400, error.message);
    // }
    // const contact = await contactsServices.addContact(name, email, phone);
    // res.status(201).json(contact);
    const newContact = await contactsServices.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const { body } = req;
    // const { error } = updateContactSchema.validate(body);

    // if (error) {
    //   throw new HttpError(400, error.message);
    // }

    if (!Object.keys(req.body).length) {
      throw new HttpError(400, "Body must have at least one field");
    }

    const updatedContact = await contactsServices.updateContact(id, req.body);

    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
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
