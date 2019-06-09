// Internal Imports
const util = require('util');

// External Imports
const mongoose = require('mongoose');

// Custom Imports
const common = require('./common');
const constants = require('./constants');
const logger = require('./logger');
// const upload = require('./multer');

/**
 * @description Common function to get all documents.
 * @param {String} model describes collection name
 * @returns {Promise/Error} return result of get method or error
 * @author Bhargav Chudasama [05-04-2019]
 */
exports.getDocuments = async (model,option = {}) => {
    try {
        // Require collection from db
        const Model = mongoose.model(model);
        // To get list of documents from collection
        // let documents = await Model.find({
        //     $and: [{
        //         $or: [{
        //             is_deleted: false
        //         }, {
        //             is_deleted: null
        //         }]
        //     }]
        // });
        console.log(option);
        let documents = await Model.find({
        //    isActive : true
        },{},option);
        return documents;
    } catch (error) {
        logger.error(util.format(`Error Occured while getting documents from collection ${model} %O`, error));
        throw new Error(error);
    }
};

/**
 * @description Common function to get documents By ID.
 * @param {String} model describes collection name
 * @param {String} collectionId describes collection id
 * @returns {Promise/Error} return result of get by id method or error
 * @author Bhargav Chudasama [05-04-2019]
 */
exports.getDocumentById = async (model, collectionId,option = {}) => {
    try {
        // Require collection from db
        const Model = mongoose.model(model);
        // To get document by id

        console.log(option);
        let document = await Model.findOne({
            _id: collectionId
        },{},option);

        return document;
    } catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error occured while getting document from collection ${model}by id: ${collectionId} %O`, error));
        throw new Error(error);
    }
};

/**
 * @description Common function to add documents.
 * @param {String} model describes collection name
 * @param {Array} docs describes one or more documents that to be add.
 * @returns {Promise/Error} return result of add method or error
 * @author Bhargav Chudasama [05-04-2019]
 */
exports.addDocument = async (model, docs) => {
    try {
        // Require collection from db
        const Model = mongoose.model(model);
        // To create new document in collection
        const newDoc = new Model(docs);
       
        // To add document in DB   
        let insertedDocument = await Model.create(newDoc);
        return insertedDocument;
    } catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error Occured while adding document to ${model} %O`, error));
        throw error;
    }
};

/**
 * @description Common function to add documents with images.
 * @param {String} model describes collection name
 * @param {Array} docs describes one or more documents that to be add.
 * @param {Array} files describes images that to be add.
 * @returns {Promise/Error} return result of add method or error
 * @author Bhargav Chudasama [05-04-2019]
 */
// Creates new document with image in the collection.
exports.addDocumentWithImage = async (model, docs, files) => {
    try {
        // Require collection from db
        let Model = mongoose.model(model);
        // To create new document in collection.
        let newDocument = new Model(docs);
        
        // checking file exists  
        if (files) {
            // newDocument.newsImage = files.filename 
            newDocument.images = files
        } else {
            newDocument.images = "";
        }
        
        // Create new thing
        let insertedDocument = await Model.create(newDocument);

        return insertedDocument;

    } catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error Occured while adding document with image to ${model} %O`, error));
        throw error;
    }
};

/**
 * @description Common function to update documents.
 * @param {String} model describes collection name
 * @param {Array} docs describes one or more documents that to be add.
 * @param {String} collectionId describes documents id.
 * @returns {Promise/Error} return result of add method or error
 * @author Bhargav Chudasama [05-04-2019]
 */
exports.modifyDocument = async (model, docs, collectionId) => {
    try {
        // Require collection from db
        const Model = mongoose.model(model);
        // 
        let id = collectionId;
        if (!id) {
            id = docs._id;
        }
        console.log(docs);
        // Delete _id form request payload.
        if (docs._id) delete docs._id;

        // To get document by id
        let doc = await Model.findById(id);

        // If doc does not exists return not found.
        if (!doc) throw new Error("Documents not found");

        // 
        let updated = Object.assign(doc, docs);

        // If not updated return
        if (!updated) {
            throw new Error("Documents may be not updated");
        }

        // To modify document in db
        let response = await updated.save();

        return response;
    } catch (error) {
        logger.error(util.format(`Error occured while modifying document of COLLECTION: ${model} with ID: ${collectionId} %O`, error));
        throw error;
    }
};

/**
 * @description Common function to update documents.
 * @param {String} model describes collection name
 * @param {String} collectionId describes collection id.
 * @returns {Promise/Error} return result of add method or error
 * @author Bhargav Chudasama [05-04-2019]
 */
exports.softdestroy = async (model, collectionId) => {


    try {
        // Require collection from db
        const Model = mongoose.model(model);
        // To get document by id
        let doc = await Model.findById(collectionId);
        // If document not exists in db
        if (!doc) throw new Error("Documents may be not updated");

        doc.isActive = false;
        let response = doc.save();
        return response;

    } catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error occured while soft removing document from COLLECTION: ${model} with ID: ${collectionId} %O`, error));
        throw error;
    }
};

/**
 * @description Common function to remove documents.
 * @param {String} model describes collection name
 * @param {String} collectionId describes collection id.
 * @returns {Promise/Error} return result of add method or error
 * @author Bhargav Chudasama [05-04-2019]
 */

exports.removeDocument = async (model, collectionId) => {
    try {
        // Require collection from db
        const Model = mongoose.model(model);
        // To get document by id
        let doc = await Model.findById(collectionId);
        // If document not exists in db
        if (!doc) throw new Error("Documents may be not updated");
        // To remove doc from db
        let response = await doc.remove();

        return response;

    } catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error occured while removing document from COLLECTION: ${model} with ID: ${collectionId} %O`, error));
        throw error;
    }
};

/**
 * @description Common function to remove multiple documents.
 * @param {String} model describes collection name
 * @param {Array} docs describes one or more documents that to be add.
 * @returns {Promise/Error} return result of add method or error
 * @author Parth Patel [05-04-2019]
 */
exports.addMultipleDocuments = async (model, docs) => {
    try {
        // Require collection from db
        const Model = mongoose.model(model);
        let documents;
        if (docs) {
            // To add list of documents into collection
            documents = await Model.insertMany(docs);
            return documents;
        }
        else {
            throw new Error("Some documents may not be added");
        }
        // Sending response

    } catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error Occured while adding documents into collection ${model} %O`, error));
        throw error;
    }
};

/**
 * @description Common function to remove multiple documents.
 * @param {String} model describes collection name
 * @param {Object} query describes one or more criteria to match document that to be remove.
 * @returns {Promise/Error} return result of remove method or error
 * @author Parth Patel [05-04-2019]
 */
exports.removeMultipleDocuments = async (model, query) => {
    try {
        // Require collection from db
        const Model = mongoose.model(model);
        let deleteResults;
        if (query && typeof (query) === "object") {

            // To remove list of documents from collection.query is criteria to match documents
            deleteResults = await Model.deleteMany(query);
        }
        else {
            throw new Error("Query is not defined");
        }

        if (deleteResults) {
            return deleteResults;
        }
        else {
            throw new Error("Documents are not deleted.");
        }
    } catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error Occured while removing documents from collection ${model} %O`, error));
        throw error;
    }
}

/**
 * @description Common function to update multiple documents.
 * @param {String} model describes collection name
 * @param {Object} query describes one or more criteria to match document that to be update.
 * @param {Object} updateField to hold  set to fields to be updated
 * @returns {Promise/Error} return result of update method or error
 * @author Parth Patel [05-04-2019]
 */
exports.updateMultipleDocuments = async (model, query, updateField) => {
    try {

        // Require collection from db
        const Model = mongoose.model(model);

        // To update list of documents.query is criteria to match documents and updateField is field that to be update
        let updateResult = await Model.updateMany(query, updateField);

        if (updateResult) {
            return updateResult;
        }
        else {
            throw new Error("Some Documents may be not updated");
        }
    }
    catch (error) {
        // logging errors to logger
        logger.error(util.format(`Error Occured while updating documents in collection ${model} %O`, error));
        throw error;
    }
}
