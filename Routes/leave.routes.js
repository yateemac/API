module.exports = (app) => {
    const LeaveContrllr = require('../Controllers/leave.controllers');

    //1. GET REQUEST
    app.get('/api/leave/type', LeaveContrllr.getAllLeaveTypes);

    //2. GET all applications
    app.get('/api/leave/applns', LeaveContrllr.getAllLeaveapplns);

    
    //3. GET specific applications
    app.get('/api/leave/appln/:leaveappnbr', LeaveContrllr.getLeaveappln);

    //4. POST LEAVE APPLICATION]
    app.post('/api/leave/new', LeaveContrllr.postLeave);

    //5. Give management Level1 approval
    app.put('/api/leave/approval/manager', LeaveContrllr.managerapproval);

    //6. Give management Level2 approval
    app.put('/api/leave/approval/levelTwo', LeaveContrllr.levelTwoapproval);
   



};
