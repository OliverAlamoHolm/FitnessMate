import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {User} from '../common/users.service';
import {Coach} from '../coaches/coach.service';
import {Athlete, AthleteService} from '../athletes/athlete.service';

const AU_KEY = 'actualUser';
const AC_KEY = 'actualCoach';
const AA_KEY = 'actualAthlete';
const ID_KEY = 'actualID';
const UID_KEY = 'actualUID';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor(private storage: Storage, private athleteService: AthleteService) {
   }

  addActualUser(user: User): Promise<any>{
    return this.storage.get(AU_KEY).then(()=>{
        return this.storage.set(AU_KEY, user);
    })
  }

  getActualUser(): Promise<User>{
    return this.storage.get(AU_KEY)
  }

  deleteActualUser(): Promise<User>{
      let us: User = null;
      return this.storage.set(AU_KEY, us)
  }

  addActualCoach(coach: Coach): Promise<any>{
    return this.storage.get(AC_KEY).then(()=>{
        return this.storage.set(AC_KEY, coach);
    })
  }

  getActualCoach(): Promise<Coach>{
    return this.storage.get(AC_KEY)
  }

  deleteActualCoach(): Promise<Coach>{
    let co: Coach = null;
    return this.storage.set(AC_KEY, co)
  }

  updateActualCoach(coach: Coach){
    this.deleteActualCoach()
    this.addActualCoach(coach)
  }

  addActualAthlete(athlete: Athlete): Promise<any>{
    return this.storage.get(AA_KEY).then(()=>{
        return this.storage.set(AA_KEY, athlete);
    })
  }

  addActualId(id: string): Promise<any>{
    return this.storage.get(ID_KEY).then(()=>{
      return this.storage.set(ID_KEY, id);
    }) 
  }

  getActualAthlete(): Promise<Athlete>{
    return this.storage.get(AA_KEY)
  }

  deleteActualAthlete(): Promise<Athlete>{
      let at: Athlete = null;
      return this.storage.set(AA_KEY, at)
  }

  updateActualAthlete(athlete: Athlete){
    this.deleteActualAthlete()
    this.addActualAthlete(athlete)
  }

  deleteActualID(){
    let id: string = null;
    return this.storage.set(ID_KEY, id)
  }

  getActualID(): Promise<string>{
    return this.storage.get(ID_KEY)
  }

  addActualUID(uid: string): Promise<any>{
    return this.storage.get(UID_KEY).then(()=>{
      return this.storage.set(UID_KEY, uid);
    }) 
  }

  deleteActualUID(){
    let uid: string = null;
    return this.storage.set(UID_KEY, uid)
  }

  getActualUID(): Promise<string>{
    return this.storage.get(UID_KEY)
  }
  
}
