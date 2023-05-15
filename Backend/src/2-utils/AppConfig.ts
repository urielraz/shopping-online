class AppConfig{

    // Host of the DB
    public host = 'localhost';

    // Username of the DB
    public username = 'root';

    // The passwordof the DB
    public password = '';

    // Name of the DB
    public database = 'shop_online';

    // The port of the Rest API
    public port = 3001;

}
const appConfig = new AppConfig();
export default appConfig; // Singleton