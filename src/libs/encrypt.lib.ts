import bcrypt from "bcrypt";

const encrypt = (data: string, numOfSaltRounds: number): Promise<string> => bcrypt.hash(data, numOfSaltRounds);

const compare = (plain: string, encrypted: string): Promise<boolean> => bcrypt.compare(plain, encrypted);

const EncryptLib = {
    encrypt,
    compare,
}

export {
    encrypt,
    compare,
};

export default EncryptLib;