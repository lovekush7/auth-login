const mongoose = require('mongoose');
const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    project_type:
    {
      type: String,
      required: true
    },

    description:
    {
      type: String,
      required: true
    },
    pending_work:
    {
      type: String,
      required: true
    },
    team:
    {
      type: String,
      required: true

    },
    start_date:
    {
      type: Date,
      default: Date.now,
      required: true
    }
  }
)
module.exports = mongoose.model('Posts', PostSchema
);