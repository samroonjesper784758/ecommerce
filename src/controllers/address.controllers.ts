import { Request, Response } from "express";
import {
  validateCreateAddressSchema,
  validateUpdateUser,
} from "../schema/address.schema";
import * as addressServices from "../services/address.services";
import {
  createAddressDto,
  updateAddressDto,
} from "../interfaces/address.interfaces";

export const handleCreateAddress = async (req: Request, res: Response) => {
  const { id } = req.user;
  const data = validateCreateAddressSchema.parse(req.body) as createAddressDto;
  const { address } = await addressServices.handleCreateAddress(data, id);
  return res.status(201).json({
    message: "Successfully created address",
    address,
  });
};

export const handleGetAllAddresses = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { addresses } = await addressServices.handleGetAllAddresses(id);
  return res.status(200).send(addresses);
};

export const handleDeleteAddressById = async (req: Request, res: Response) => {
  const { id: addressId } = req.params;

  const { deletedAddress } = await addressServices.handleDeleteAddressById(
    addressId
  );

  return res.status(200).json({
    message: "Address deleted successfully",
    deletedAddress,
  });
};

export const handleUpdateAddressById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newAddress = req.body as updateAddressDto;

  const { updatedAddress } = await addressServices.handleUpdateAddressById(
    id,
    newAddress
  );

  return res.status(201).json({
    message: "Address updated successfully",
    newAddress: updatedAddress,
  });
};

export const handleUpdateUser = async (req: Request, res: Response) => {
  const userId = req.user.id
  const data = validateUpdateUser.parse(req.body) as {
    defaultShippingAddress: string;
  };

  const {updatedUser} = await addressServices.handleUpdateUser(data, userId)
  return res.status(201).send(updatedUser)
};
