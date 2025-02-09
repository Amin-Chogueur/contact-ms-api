import Person from "../models/personModel.js";

export async function handleCreatePerson(req, res) {
  try {
    const formData = req.body;
    const userId = req.user._id;
    const { name, phone, address, category, email } = formData;

    if (!name || !category || !phone) {
      return res
        .status(400)
        .json({ message: "Please fill out the required fields." });
    }

    const existingPerson = await Person.findOne({
      userId, // Ensure it matches the specific user
      $or: [{ email }, { phone }],
    });

    if (existingPerson) {
      return res.status(409).json({
        message:
          existingPerson.email === email
            ? "Another contact already has this email."
            : "Another contact already has this phone number.",
      });
    }

    const newPerson = await Person.create({
      name,
      phone,
      address,
      category,
      email,
      userId,
    });

    return res
      .status(201)
      .json({ message: "New contact created successfully.", newPerson });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "An error occurred while creating the contact. Please try again.",
    });
  }
}

export async function handleGetAllPeople(req, res) {
  try {
    const userId = req.user._id;
    const people = await Person.find({ userId });

    return res
      .status(200)
      .json({ message: "All contacts retrieved successfully.", people });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving contacts." });
  }
}

export async function handleGetPerson(req, res) {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);

    if (!person) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res
      .status(200)
      .json({ message: "Contact retrieved successfully.", person });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the contact." });
  }
}

export async function handleDeletePerson(req, res) {
  try {
    const { id } = req.params;
    await Person.findByIdAndDelete(id);

    return res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the contact." });
  }
}

export async function handleEditPerson(req, res) {
  try {
    const { id } = req.params;
    const editedPerson = req.body;
    const person = await Person.findByIdAndUpdate(id, editedPerson, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Contact updated successfully.", person });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the contact." });
  }
}
