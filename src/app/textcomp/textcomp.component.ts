import { Component, OnInit } from '@angular/core';
import {RecordsService} from '../records.service'

@Component({
  selector: 'app-textcomp',
  templateUrl: './textcomp.component.html',
  styleUrls: ['./textcomp.component.styl'],
  providers: [RecordsService]
})
export class TextcompComponent implements OnInit {

  info1received: string[] = [];
  info2received: string[] = [];
  info3received: string[] = [];

  getinfo1() {
    this.info1received = this.recordservice.getinfo1()
  }

  getinfo2() {
    this.info2received = this.recordservice.getinfo2()
  }

  getinfo3() {
    this.info3received = this.recordservice.getinfo3()
  }

  constructor(private recordservice : RecordsService) { }

  ngOnInit(): void {
  }

}
