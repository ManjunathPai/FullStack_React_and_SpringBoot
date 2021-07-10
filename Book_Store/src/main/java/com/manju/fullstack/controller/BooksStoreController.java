package com.manju.fullstack.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manju.fullstack.dao.BooksStoreRepository;
import com.manju.fullstack.exceptions.ResourceNotFoundException;
import com.manju.fullstack.model.Book;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class BooksStoreController {

	@Autowired
	BooksStoreRepository repository;

	@GetMapping("/books")
	public List<Book> getAllBooks() {
		return repository.findAll();
	}
	
	@PostMapping("/save")
	public Book saveBook(@RequestBody Book aBook) {
		return repository.save(aBook);
	}
	
	@GetMapping("/getBook/{id}")
	public Book getBook(@PathVariable long id) {
		
		return repository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Requested Book Not Found"));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable long id,@RequestBody Book aBook) {
		
		Book myBook=repository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Requested Book Not Found"));
		myBook.setAuthorName(aBook.getAuthorName());
		myBook.setBookName(aBook.getBookName());
		myBook.setPublisher(aBook.getPublisher());
		myBook=repository.save(myBook);
		return ResponseEntity.ok(myBook);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteBook(@PathVariable long id) {
		
		Book myBook=repository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Requested Book Not Found"));
		repository.delete(myBook);
		Map<String,Boolean> myResponseMap = new HashMap<>();
		myResponseMap.put("Deleted", Boolean.TRUE);
		return ResponseEntity.ok(myResponseMap);
}
}