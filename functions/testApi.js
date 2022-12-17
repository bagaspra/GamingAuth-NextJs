exports.handler = async () => {
  console.log('function run');

  const data = { name: 'bagas', age: 24, job: 'student' };

  //return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
