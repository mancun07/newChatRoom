let users = [];

function userJoin(id, username, room) {
  if (users.find((u) => u.username === username)) {
    return "Username must be unique";
  }

  const user = { id, username, room };
  users.push(user);
  return user;
}

// get current user
function getCurrentUser(id) {
  return users.find((user) => {
    return user.id === id;
  });
}

// users leave chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
