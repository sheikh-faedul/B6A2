import app from "./app"
import config from "./config";

const port = config.port;
app.get('/', (req, res) => {
  res.send('server is running')
})
app.listen(5000, () => {
    console.log(`server is running ${port}`)
})