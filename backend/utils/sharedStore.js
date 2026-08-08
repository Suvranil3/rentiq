const initialUsers = [
  {
    _id: 'u-1',
    name: 'Admin User',
    email: 'admin@rentiq.com',
    phone: '+91 98765 00001',
    role: 'admin',
    status: 'Active',
    joinedDate: '2026-08-01',
    totalRentals: 0,
    activeRentals: 0
  },
  {
    _id: 'u-2',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    status: 'Active',
    joinedDate: '2026-08-01',
    totalRentals: 3,
    activeRentals: 1
  },
  {
    _id: 'u-3',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 11111',
    role: 'customer',
    status: 'Active',
    joinedDate: '2026-08-02',
    totalRentals: 2,
    activeRentals: 1
  }
];

const memoryUsers = [...initialUsers];

const addUser = (user) => {
  const existing = memoryUsers.find(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (!existing) {
    memoryUsers.unshift(user);
  }
  return user;
};

const getUsers = () => memoryUsers;

module.exports = { memoryUsers, addUser, getUsers };
