import * as admin from 'firebase-admin';
import { PocData } from '../dto/poc_data';

export class FirebaseConnection {
  constructor(private db) {
    this.db = admin.firestore();
  }

  async getPocsData(idPoc: string) {
    //Obtener data de los pocs mediante request a firebase
    const pocDataFirebase = await this.db
      .collection('pocs')
      .doc(idPoc)
      .get()
      .data();
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
