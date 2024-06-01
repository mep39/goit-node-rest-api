// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updContact,
// }
import { Contact } from "../models/contact.js";
// import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const getContacts = await Contact.find();
    res.json(getContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const getContact = await Contact.findById(req.params.id);
    if (!getContact) {
      next(HttpError(404));
    }
    res.status(200).json(getContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const delContact = await Contact.findByIdAndDelete(req.params.id);
    if (!delContact) {
      next(HttpError(404));
    }
    res.status(200).json(delContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await Contact.create(name, email, phone);
    if (!newContact) {
      next(HttpError(404));
    }
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!Object.keys(req.body).length) {
      return next(HttpError(400, "Body must have at least one field"));
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body);
    if (!updatedContact) {
      return next(HttpError(404, "Not found"));
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    res.status(404).json({ message: HttpError(404).message });
  }
  res.json(result);
};
