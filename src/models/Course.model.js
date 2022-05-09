const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add a number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    dafault: Date.now()
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
})

// static method to get avg of course tuitions
CourseSchema.statics.getAvaregeCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' }
      }
    }
  ])

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    })
  } catch (error) {
    console.error(error)
  }
}

// call getAvaregeCost after save
CourseSchema.post('save', function () {
  this.constructor.getAvaregeCost(this.bootcamp)
})

// call getAvaregeCost before remove
CourseSchema.pre('remove', function () {
  this.constructor.getAvaregeCost(this.bootcamp)
})

module.exports = mongoose.model('Course', CourseSchema)
