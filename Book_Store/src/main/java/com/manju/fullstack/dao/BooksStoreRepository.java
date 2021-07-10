package com.manju.fullstack.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.manju.fullstack.model.Book;

@Repository
public interface BooksStoreRepository extends JpaRepository<Book, Long> {

}
