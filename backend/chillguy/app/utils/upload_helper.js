const multer = require('multer');
const logger = require('log4js').getLogger('upload_helper');
const {
  IMAGE_UPLOAD_LIMIT_IN_MB,
} = require('../../config/envs');
const { InvalidInputError } = require('../errors/invalid_input_error');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSequence = Math.random().toString().replace(/0\./, '');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.') + 1,
      file.originalname.length
    );
    cb(null, `${uniqueSequence}-${file.fieldname}.${ext}`);
  },
});

const uploader = (fields) => async (req, res, next) => {
  let upload = null;
  try {
    upload = multer({
      storage: storage,
      limits: {
        fileSize: parseInt(IMAGE_UPLOAD_LIMIT_IN_MB, 10) * 1024 * 1024,
      },
    }).fields(fields);
  } catch (err) {
    return next(new InvalidInputError('Error occured in file upload'));
  }
  return upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error('MulterError error occured');

      return next(
        new InvalidInputError(`Error occured in file uploading: ${err}`)
      );
    }
    if (err) {
      logger.error('An unknown error occured');

      return next(
        new InvalidInputError(
          `An unknown error occured in file uploading: ${err}`
        )
      );
    }
    return next();
  });
};

module.exports = {
  uploader,
};
