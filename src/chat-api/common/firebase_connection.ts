import * as admin from 'firebase-admin';
import { PocData } from '../dto/poc_data';
import { ServiceAccount } from 'firebase-admin';

export class FirebaseConnection {
  constructor(private db) {
    const adminConfig: ServiceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    // Initialize the firebase admin app
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: 'https://fiestacerca-ws-default-rtdb.firebaseio.com',
    });
    this.db = admin.firestore();
  }

  async getPocsData(idPoc: string) {
    //Obtener data de los pocs mediante request a firebase
    const pocTemporalDataFirebase = await this.db
      .collection('pocs')
      .doc(idPoc)
      .get();
    const pocDataFirebase = pocTemporalDataFirebase.data();
    //Organiza los datos de firebase
    const pocData: PocData = {
      pocId: pocDataFirebase.pocId,
      pocPayphone: pocDataFirebase.pocPayphone,
      pocName: pocDataFirebase.name,
      pocPhone: pocDataFirebase.phone,
      lastLogin: '',
      pocSector: pocDataFirebase.direction,
      groupId: pocDataFirebase.groupId,
      tchatId: pocDataFirebase.tchatId,
    };
    return pocData;
  }
}
