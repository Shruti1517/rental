import { Component, OnInit } from '@angular/core';
import { LandlordService } from '../../_services/landlord.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-request-landloard-dash',
  templateUrl: './request-landloard-dash.component.html',
  styleUrls: ['./request-landloard-dash.component.css']
})
export class RequestLandloardDashComponent implements OnInit {
  data: any[] = [];
  searchForm: FormGroup;
  decline_data: any[];
  accept_data: string;
  accept_decline_data: any;
  config: any;
  info: {};
  acceptValue = false;
  declineValue = false;
  indexRow: number;
  options = ['Pending', 'Accepted', 'Declined'];
  changeStatusId: any;
  statusid: {};
  id: any;
  updateStatus: any;
  delete = false;
  deleteIndex: number;
  filterData: any;
  arrayIndex: number;
  constructor(private landlordService: LandlordService, public toastr: ToastrManager, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder, ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.data.length
    };
  }
  ngOnInit() {
    this.get_request_data();
    this.searchForm = this.formBuilder.group({
      searchData: [''],
      optionSelect: ['']
    })
  }
  get_request_data() {
    this.landlordService.get_request_data().subscribe((res: any) => {
      this.data = res;
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  accept_decline_request_status(item, status) {
    this.info = { id: item.id, status: status };
    this.landlordService.accept_decline_request_status(this.info).subscribe((res: any) => {
      this.accept_decline_data = res;
      console.log(res);
      if (res.status) {
        status == 'accept' ? this.toastr.successToastr('Accepted!.', 'Success!') : this.toastr.successToastr('Declined!.', 'Success!');
        status == 'accept' ? item.status = 1 : item.status = 2;
      }
    }, (error) => {
      console.log(error);
    })
  }
  onOptionSelected(event) {
    console.log(event);
  }
  onSearch() {
    let res = this.searchForm.value;
    if (res.searchData == '' && res.optionSelect == null) {
      this.toastr.errorToastr('Please enter atleast one field for filter  !!!.', 'Oops!');
    }
    else {
      this.searchForm = new FormGroup({
        searchData: new FormControl(res.searchData),
        optionSelect: new FormControl(res.optionSelect)
      })
      console.log(this.searchForm.value);
      this.landlordService.searchRequestData(this.searchForm.value).subscribe((res: any) => {
        console.log(this.searchForm.value);
        console.log(res);
        this.data = res;
        this.filterData = res;
      });
    }
  }
  rowIndex(i: number) {
    this.indexRow = i;
    console.log(i);
  }
  deleteRequestStatus(id, arrayIndex, updateStatus) {
    this.changeStatusId = id;
    this.arrayIndex = arrayIndex;
    this.updateStatus = updateStatus;
    $('#deleteModal').modal('show');
  }
  deleteRequestStatusConfiramtion() {
    this.landlordService.deleteRequestStatusConfiramtion({ id: this.changeStatusId, status: this.updateStatus }).subscribe((response) => {
      console.log(this.statusid);
      console.log(response);
      if (!!response) {
        this.toastr.successToastr('Request deleted successfully!!!', 'Success!');
        $('#deleteModal').modal('hide');
        this.data.splice(this.arrayIndex, 1);
      }
    });
  }
}
