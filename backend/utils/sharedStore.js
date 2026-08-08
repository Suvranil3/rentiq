const CUSTOMERS_RAW = [
  { name: 'Alex Johnson', email: 'alex@example.com', phone: '+91 98765 43210' },
  { name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 11111' },
  { name: 'Rohan Verma', email: 'rohan@example.com', phone: '+91 98765 22222' },
  { name: 'Aanya Kapoor', email: 'aanya@example.com', phone: '+91 98765 33333' },
  { name: 'Kabir Mehta', email: 'kabir@example.com', phone: '+91 98765 44444' },
  { name: 'Neha Gupta', email: 'neha@example.com', phone: '+91 98765 55555' },
  { name: 'Vikram Malhotra', email: 'vikram@example.com', phone: '+91 98765 66666' },
  { name: 'Diya Sen', email: 'diya@example.com', phone: '+91 98765 77777' },
  { name: 'Arjun Nair', email: 'arjun@example.com', phone: '+91 98765 88888' },
  { name: 'Sanya Patel', email: 'sanya@example.com', phone: '+91 98765 99999' },
  { name: 'Aditya Joshi', email: 'aditya@example.com', phone: '+91 98765 12345' },
  { name: 'Meera Rao', email: 'meera@example.com', phone: '+91 98765 23456' },
  { name: 'Dev Bhatia', email: 'dev@example.com', phone: '+91 98765 34567' },
  { name: 'Ishita Roy', email: 'ishita@example.com', phone: '+91 98765 45678' },
  { name: 'Karan Saxena', email: 'karan@example.com', phone: '+91 98765 56789' },
  { name: 'Anushka Reddy', email: 'anushka@example.com', phone: '+91 98765 67890' },
  { name: 'Rahul Deshmukh', email: 'rahul@example.com', phone: '+91 98765 78901' },
  { name: 'Pooja Banerjee', email: 'pooja@example.com', phone: '+91 98765 89012' },
  { name: 'Siddharth Gill', email: 'siddharth@example.com', phone: '+91 98765 90123' },
  { name: 'Tanvi Kulkarni', email: 'tanvi@example.com', phone: '+91 98765 01234' },
  { name: 'Yash Singhania', email: 'yash@example.com', phone: '+91 98765 11223' },
  { name: 'Ritika Agarwal', email: 'ritika@example.com', phone: '+91 98765 22334' },
  { name: 'Manish Chopra', email: 'manish@example.com', phone: '+91 98765 33445' },
  { name: 'Shreya Iyer', email: 'shreya@example.com', phone: '+91 98765 44556' },
  { name: 'Tarun Dave', email: 'tarun@example.com', phone: '+91 98765 55667' },
  { name: 'Nisha Pandey', email: 'nisha@example.com', phone: '+91 98765 66778' },
  { name: 'Varun Khurana', email: 'varun@example.com', phone: '+91 98765 77889' },
  { name: 'Kavya Menon', email: 'kavya@example.com', phone: '+91 98765 88990' },
  { name: 'Sameer Jain', email: 'sameer@example.com', phone: '+91 98765 99001' },
  { name: 'Deepika Sethi', email: 'deepika@example.com', phone: '+91 98765 00112' }
];

const initialUsers = [
  {
    _id: 'admin-1',
    name: 'Admin User',
    email: 'admin@rentiq.com',
    phone: '+91 98765 00001',
    role: 'admin',
    status: 'Active',
    joinedDate: '2026-07-01',
    totalRentals: 0,
    activeRentals: 0
  },
  ...CUSTOMERS_RAW.map((c, idx) => ({
    _id: `u-${idx + 1}`,
    name: c.name,
    email: c.email,
    phone: c.phone,
    role: 'customer',
    status: idx % 15 === 14 ? 'Suspended' : 'Active',
    joinedDate: `2026-07-${String((idx % 25) + 1).padStart(2, '0')}`,
    totalRentals: (idx === 0) ? 3 : (idx % 3 === 0) ? 2 : 1,
    activeRentals: (idx % 2 === 0) ? 1 : 0
  }))
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
