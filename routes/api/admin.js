const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const moment = require('moment');

// Details of all users
// Total number of users ?data = totalUsers
router.get('/usersData', auth, async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    console.log(req.query.data);
    if (req.query.data === 'totalUsers') return res.json(user.length);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Retriving users with profiles
// Total number of profiles ?data = totalProfiles
router.get('/usersProfiles', auth, async (req, res) => {
  try {
    const userProfiles = await Profile.find().populate('user', [
      'name',
      'email',
      'date',
    ]);
    if (req.query.data == 'totalProfiles') return res.json(userProfiles.length);
    res.json(userProfiles);
  } catch (err) {
    res.status(500).send('Some error');
  }
});

//Retriving Posts and total number of posts
// Total number of posts ?data = totalPosts
router.get('/retrievePosts', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    if (req.query.data == 'totalPosts') return res.json(post.length);
    res.json(post);
  } catch (err) {
    res.status(500).send('Server down');
  }
});

// Retriving total number of images uploaded
router.get('/totalImages', auth, async (req, res) => {
  try {
    const profilePicUsers = await Profile.find({
      'profilePic.profilePicUrl': { $exists: true },
    }).count();
    // console.log(profilePicUsers);
    res.json(profilePicUsers);
  } catch (err) {
    res.status(500).send('Server down');
  }
});

// Retriving unexperienced Developers
router.get('/experienceDevelopers', auth, async (req, res) => {
  try {
    const totalExpDevelopers = await Profile.find({
      'experience._id': { $exists: true },
    }).count();
    // console.log(totalExpDevelopers);
    res.json(totalExpDevelopers);
  } catch (err) {
    res.status(500).send('Server down');
  }
});

// Chart JS properties

function getDatesBetween(fromDate, toDate) {
  // console.log(startDt, endDt);
  let result = [];
  let resultFin = [];
  // const fromYear = fromDate.date.getFullYear();
  // const fromMonth = fromDate.date.getMonth();
  // const toYear = toDate.date.getFullYear();
  // const toMonth = toDate.date.getMonth();
  // const months = [];
  // for (let year = fromYear; year <= toYear; year++) {
  //   let month = year === fromYear ? fromMonth : 0;
  //   const monthLimit = year === toYear ? toMonth : 11;
  //   for (; month <= monthLimit; month++) {
  //     months.push({ year, month });
  //   }
  // }
  // console.log(months);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var startDate = moment(fromDate.date);
  var endDate = moment(toDate.date);
  while (startDate.isBefore(endDate)) {
    result.push({
      year: startDate.get('year'),
      month: monthNames[startDate.get('month')],
    });
    startDate.add(1, 'month');
  }
  if (result[result.length - 1].month === 'December') {
    result.push({ year: result[result.length - 1].year + 1, month: 'January' });
  } else {
    result.push({
      year: result[result.length - 1].year,
      month:
        monthNames[monthNames.indexOf(result[result.length - 1].month) + 1],
    });
  }
  console.log(result);
  return result;
}

router.get('/analytics', auth, async (req, res) => {
  try {
    let finalObjData = {};
    // NO OF USERS PER MONTH ADDED TO DB
    // /analytics?data='usersData'
    if (req.query.data === 'usersData') {
      let userArray = {
        series: { data: [] },
        options: { xaxis: { categories: [] } },
      };
      let objUser = {};
      const user = await User.find({}, { email: 1, date: 1, _id: 0 });
      // const finalData = ;
      user
        .sort((a, b) => a.date - b.date)
        .forEach((value) => {
          let yearReceived = moment(value.date).get('year');
          const monthReceived = value.date.toLocaleString('default', {
            month: 'long',
          });
          let dtString = yearReceived + monthReceived;
          if (objUser[dtString]) objUser[dtString] += 1;
          else {
            objUser[dtString] = 1;
          }
        });
      for (let i in objUser) {
        userArray.series.data.push(objUser[i]);
        userArray.options.xaxis.categories.push(
          i.substring(4, i.length) + '-' + i.substring(0, 4)
        );
      }
      return res.json(userArray);
    } else if (req.query.data === 'skillsPerecentage') {
      console.log('I AM CALLED');
      let finalObj = { options: [], series: [] };
      let skillsObj = {};
      const developersSkills = await Profile.find({}, { skills: 1, _id: 0 });
      let arrayNew = developersSkills[0]['skills'];
      for (let i = 0; i < developersSkills.length; i++) {
        console.log(developersSkills[i]['skills']);
        arrayNew = arrayNew.concat(developersSkills[i]['skills']);
      }
      arrayNew.forEach((value) => {
        if (skillsObj[value]) {
          skillsObj[value] = skillsObj[value] + 1;
        } else {
          skillsObj[value] = 1;
        }
      });
      console.log(skillsObj);
      for (let i in skillsObj) {
        finalObj.options.push(i);
        finalObj.series.push(skillsObj[i]);
      }
      console.log(finalObj.options.length, finalObj.series.length);

      return res.json(finalObj);
    } else if (req.query.data === 'developersRolePerecentage') {
      let statusObj = {};
      let finalObj = { options: [], series: [] };
      const usersDevelopers = await Profile.find({}, { status: 1, _id: 0 });
      console.log(usersDevelopers);
      usersDevelopers
        .map((developer) => {
          return developer.status;
        })
        .forEach((value) => {
          if (statusObj[value]) {
            statusObj[value] = statusObj[value] + 1;
          } else {
            statusObj[value] = 1;
          }
        });
      for (let i in statusObj) {
        finalObj.options.push(i);
        finalObj.series.push(statusObj[i]);
      }
      res.send(finalObj);
    } else if (req.query.data === 'postsActivity') {
      const postsData = await Post.find({}, { date: 1, _id: 0 });
      let dateObj = {};
      // const dt = postsData.map((value) => {
      //   return moment(value.date).format('YYYY MM DD');
      // });
      const dt = postsData.sort((a, b) => a.date - b.date);
      // console.log(dt);
      let dtt = dt.map((value) => {
        return {
          year: value.date.getFullYear(),
          month: value.date.toLocaleString('default', {
            month: 'long',
          }),
        };
      });
      console.log(dtt);
      const datesValues = getDatesBetween(dt[0], dt[dt.length - 1]);
      for (let i = 0; i < datesValues.length; i++) {
        dateObj[datesValues[i].month + '-' + datesValues[i].year] = 0;
      }
      for (let i = 0; i < dtt.length; i++) {
        let valueToBeChecked = dtt[i].month + '-' + dtt[i].year;
        if (valueToBeChecked in dateObj) dateObj[valueToBeChecked] += 1;
      }
      console.log(dateObj);
      res.json(dateObj);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server down');
  }
});

router.put('/editData/:userId', auth, async (req, res) => {
  try {
    console.log(req.params.userId, req.body);
    const { email, name } = req.body;
    let data = await User.findByIdAndUpdate(
      req.params.userId,
      { email: email, name: name },
      { new: true }
    ).exec();
    console.log(data);
    await data.save();
    res.json({ message: 'Succesfully updated User details' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/retrieveUser', auth, async (req, res) => {
  try {
    let regCreated = req.body.searchData;
    console.log(regCreated);
    const user = await User.find({
      $or: [
        {
          email: { $regex: regCreated, $options: 'i' },
        },
        { name: { $regex: regCreated, $options: 'i' } },
      ],
    });
    // res.send(user);
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error here');
  }
});

// Retriving only one particular id - for profiles based on user
router.get('/profile/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id);
    const oneProfile = await Profile.findOne({
      user: req.params.id,
    }).populate('user', ['name', 'email', 'date']);
    console.log(oneProfile);
    res.json(oneProfile);
  } catch (err) {
    res.status(500).send('Some error in fetching');
  }
});

// Delete Full Accountby Id
router.delete('/deleteAccount/:userId', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.params.userId });
    await Profile.findOneAndRemove({ user: req.params.userId });
    await User.findOneAndRemove({ _id: req.params.userId });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send('Some Error in Deletion');
  }
});

module.exports = router;
