module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/staff',
        permanent: true,
      },
    ]
  },
}
