package junitfaq;

import org.junit.*;
import static org.junit.Assert.*;

import java.util.*;

public class MySimpleTest{
    @Test
    public void testEmptyCollection() {
        Collection collection = new ArrayList();
        assertTrue(collection.isEmpty());
    }

    public static junit.framework.Test suite() {
        return new junit.framework.JUnit4TestAdapter(MySimpleTest.class);
    }

    public static void main(String args[]) {
        org.junit.runner.JUnitCore.main("junitfaq.MySimpleTest");
    }
}